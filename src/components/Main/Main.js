import React, { useEffect, useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';

// components
import Loader from '../Loader/Loader';
import * as Fade from '../../styles/FadeIn';

const DoughnutBox = styled.div`
  width: 500px;
  height: 500px;
  display: block;
`;

const Main = () => {
  const [comparedData, setComparedData] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const [showDoughnut, setShowDoughnut] = useState(false);
  const [cuntryOptions, setCuntryOptions] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('https://api.covid19api.com/total/dayone/country/kr');
      const cuntryRes = await axios.get('https://api.covid19api.com/countries');
      console.log(cuntryRes);
      makeData(res.data);
      setShowDoughnut(true);
      setLoadingState(false);
      console.log(loadingState + '로딩');
      console.log(showDoughnut + '도넛');
    };
    const makeData = (items) => {
      // 첫 인자 acc는 쌓여가는 데이터
      // 두 번째 인자 cur는 현재 데이터
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.Recovered;

        const findItem = acc.find((a) => a.year === year && a.month === month);
        if (!findItem) {
          acc.push({
            year,
            month,
            date,
            confirmed,
            active,
            death,
            recovered
          });
        }
        if (findItem && findItem.date < date) {
          findItem.active = active;
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
            label: '국내 확진, 해제, 사망 비율',
            backgroundColor: ['#ff3d67', '#059bff', '#ffc233'],
            borderColor: ['#ff3d67', '#059bff', '#ffc233'],
            fill: false,
            data: [last.confirmed, last.recovered, last.death]
          }
        ]
      });
    };
    fetchEvents();
  }, []);
  return (
    <div>
      {loadingState ? <Loader type='bubbles' color='#019BFE' message={'데이터를 불러오는 중입니다'} /> : null}
      {showDoughnut ? (
        <Fade.FadeAnimation>
          <DoughnutBox>
            <Doughnut
              data={comparedData}
              options={({ title: { display: true, text: `누적 확진, 해제, 사망 (${new Date().getMonth() + 1})`, fontsize: 16 } }, { legend: { display: true, position: 'bottom' } })}
            />
          </DoughnutBox>
        </Fade.FadeAnimation>
      ) : null}
    </div>
  );
};

export default Main;
