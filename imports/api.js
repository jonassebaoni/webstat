import axios from 'axios/index';
import ENV from './environment';


export default {
  getTicketsTPA: year => axios({
    method: 'get',
    url: `${ENV.API_URL}/api/ticketsAggregated/${year}`,
  }),
  getTicketsTPM: (company, year) => axios({
    method: 'get',
    url: `${ENV.API_URL}/api/ticketsMonthly/${company}?year=${year}`,
  }),
  getTicketsTPW: (company, year, week) => axios({
    method: 'get',
    url: `${ENV.API_URL}/api/ticketsWeekly/${company}?year=${year}&week=${week}`,
  }),
  getTicketsTPD: (company, date) => axios({
    method: 'get',
    url: `${ENV.API_URL}/api/ticketsDaily/${company}?date=${date}`,
  }),
};
