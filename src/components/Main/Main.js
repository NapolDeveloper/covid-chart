import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import Select from 'react-select';

// Components
import Loader from '../Loader/Loader';
import * as Fade from '../../styles/FadeIn';

// Variables
const primaryColor = '#2d2d2d';
const secondColor = '#da7f8f';

// Styles
const DoughnutBox = styled.div`
  width: 500px;
  height: 500px;
  display: block;
`;

// Title Style
const CountryTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;
const CountryTitle = styled.span`
  font-size: 24px;
  color: ${primaryColor};
  font-weight: bold;
`;

const Main = () => {
  // data states
  const [comparedData, setComparedData] = useState({});

  // show bool states
  const [loadingState, setLoadingState] = useState(true);
  const [showDoughnut, setShowDoughnut] = useState(false);

  // selectbox states
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Korea (South)'); // select 박스로 선택된 state

  // test용 option
  const options = [
    {
      value: 'key',
      label: 'korea'
    },
    {
      value: 'key',
      label: 'japan'
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('https://api.covid19api.com/total/dayone/country/kr'); // 기본값을 한국으로 설정
      const countryRes = await axios.get('https://api.covid19api.com/countries'); // 나라 리스트
      makeData(res.data);
      makeCountryList(countryRes.data);
    };
    const makeCountryList = (countryList) => {
      const arr = [];

      countryList.forEach((items) => {
        const country = items.Country;
        arr.push({ label: country, value: country });
        // options.push({ label: `${country}`, value: '1' });
      });
      setCountryOptions(arr);
    };

    fetchEvents();
  }, []);

  // 코로나 데이터 만드는 함수
  const makeData = (items) => {
    // 첫 인자 acc는 쌓여가는 데이터
    // 두 번째 인자 cur는 현재 데이터
    const arr = items.reduce((acc, cur) => {
      const currentDate = new Date(cur.Date);

      // 날짜 값 추출
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const date = currentDate.getDate();

      // res.data 값
      const confirmed = cur.Confirmed;
      const death = cur.Deaths;
      const recovered = cur.Recovered;

      const findItem = acc.find((a) => a.year === year && a.month === month);
      if (!findItem) {
        acc.push({
          year,
          month,
          date,
          confirmed,
          death,
          recovered
        });
      }
      if (findItem && findItem.date < date) {
        findItem.death = death;
        findItem.date = date;
        findItem.year = year;
        findItem.month = month;
        findItem.recovered = recovered;
        findItem.confirmed = confirmed;
      }

      return acc;
    }, []);
    const last = arr[arr.length - 1];
    setComparedData({
      labels: ['확진자', '격리해제', '사망'],
      datasets: [
        {
          label: '확진, 해제, 사망 비율',
          backgroundColor: ['#ff3d67', '#059bff', '#ffc233'],
          borderColor: ['#ff3d67', '#059bff', '#ffc233'],
          fill: false,
          data: [last.confirmed, last.recovered, last.death]
        }
      ]
    });
    setLoadingState(false);
    setShowDoughnut(true);
  };

  // select box 선택시 실행. country value 값을 전달하여 새로 get한 데이터를 makeData로 넘겨줌
  const countryChange = async (country) => {
    console.log(`선택된 나라 ${country}`);
    const res = await axios.get(`https://api.covid19api.com/total/dayone/country/${country}`);
    setSelectedCountry(country);
    setLoadingState(true);
    setShowDoughnut(false);
    makeData(res.data);
  };
  return (
    <div>
      <Select
        options={countryOptions}
        // value={countryOptions.find((op) => {
        //   return op.value;
        // })}
        onChange={(value) => countryChange(value.value)}
        placeholder='Please select country'
        isSearchable
      />
      <CountryTitleWrap>
        <CountryTitle>{`Covid-19 Status in ${selectedCountry}`}</CountryTitle>
      </CountryTitleWrap>
      {loadingState ? <Loader type='bubbles' color='#019BFE' message={'Loading...'} /> : null}
      {showDoughnut ? (
        <Fade.FadeAnimation>
          <DoughnutBox>
            <Doughnut data={comparedData} options={({ title: { display: true, text: `누적 확진, 해제, 사망 `, fontsize: 16 } }, { legend: { display: true, position: 'bottom' } })} />
          </DoughnutBox>
        </Fade.FadeAnimation>
      ) : null}
    </div>
  );
};

export default Main;
