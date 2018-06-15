import {
  KOMPANY_ERROR,
  KOMPANY_REQUEST,
  KOMPANY_SUCCESS,
} from './actionTypes';

export const getKompanyRequest = () => ({
  type: KOMPANY_REQUEST,
  payload: {
    isFetching: true,
  },
});

export const getKompanySuccess = data => ({
  type: KOMPANY_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
});

export const getKompanyError = error => ({
  type: KOMPANY_ERROR,
  payload: {
    isFetching: false,
    error,
  },
});

export const getKompany = id => (dispatch) => {
  dispatch(getKompanyRequest());
  setTimeout(() => {
    const mockData = {
      companyName: 'OpenKompany',
      description: 'Our idea is to be a platform for decentralized and publicly transparent companies. \n' +
      'You can add your employees, perform/receive payments and have public and open statistics.',
      vision: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing' +
      ' in place of English to emphasise design elements over content. It\'s also called placeholder' +
      ' (or filler) text. It\'s a convenient tool for mock-ups. It helps to outline the visual elements' +
      ' of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of' +
      ' a Latin text by the classical author and philosopher Cicero.',
      numOfEmployees: 14,
      founder: 'Carlos Torres',
      wallet: '0xf7EE7fB4cbCfAc1161589A7595E0376E4b7D167A',
      contact: 'carlos@mail.com',
      location: 'Avennua Libreta 22',
      id: 12,
      legalID: '1356354r2342',
      employees: [
        {
          name: 'Carlos Torres',
          contact: 'carlos@name.com',
          position: 'Front-end Engineer',
          salary: '1500$',
        },
        {
          name: 'Carlos Torres',
          contact: 'randomemail@gmail.com',
          position: 'Front-end Engineer',
          salary: '1500$',
        },
        {
          name: 'Carlos Torres',
          contact: 'carlos@name.com',
          position: 'Front-end Engineer',
          salary: '1500$',
        },
        {
          name: 'Carlos Torres',
          contact: 'carlos@name.com',
          position: 'Front-end Engineer',
          salary: '1500$',
        }, {
          name: 'Carlos Torres',
          contact: 'carlos@name.com',
          position: 'Front-end Engineer',
          salary: '1500$',
        },
      ],
      recurringPayments: [
        {
          name: 'Cloud',
          value: 250,
          address: '',
          day: '21',
        },
        {
          name: 'Hosting',
          value: 100.3,
          address: '',
          day: '13',
        },
        {
          name: 'Hosting',
          value: 100.3,
          address: '',
          day: '13',
        },
      ],
    };
    dispatch(getKompanySuccess(mockData));
  }, 1000);
};