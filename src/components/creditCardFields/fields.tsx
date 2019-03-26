import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Input, Select, Switch} from 'antd';

type TExpirationValues = Array<{
  label: string;
  value: string;
}>;
const MONTHS: TExpirationValues = [
  {value: '01', label: 'January'},
  {value: '02', label: 'February'},
  {value: '03', label: 'March'},
  {value: '04', label: 'April'},
  {value: '05', label: 'May'},
  {value: '06', label: 'June'},
  {value: '07', label: 'July'},
  {value: '08', label: 'August'},
  {value: '09', label: 'September'},
  {value: '10', label: 'October'},
  {value: '11', label: 'November'},
  {value: '12', label: 'December'},
];
const YEARS: TExpirationValues = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear; i < currentYear + 10; i++) {
  YEARS.push({value: String(i).slice(2), label: String(i)});
}

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const INPUT_STYLE = {
  marginBottom: 5,
};
const SELECT_STYLE = {
  margin: '0 5px',
  width: 120,
};
const BTN_STYLE = {
  marginTop: 5,
};

type TProps = {};

export default function Fields (props: TProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [expDateFull, setExpDateFull] = useState<string>('');
  const [expMonth, setExpMonth] = useState<string>('');
  const [expYear, setExpYear] = useState<string>('');
  const [isAlternateDateFormat, setIsAlternateDateFormat] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  function toggleDateFormat () {
    setIsAlternateDateFormat(!isAlternateDateFormat);
  }

  function onSubmit () {
    console.log('save credit card clicked');
    console.log({cardNumber, cvv, expDateFull, expMonth, expYear, isAlternateDateFormat, name,});
  }

  return (
    <>
      <Input
        id="name"
        placeholder="Name on Card"
        style={INPUT_STYLE}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Input
        id="cardNumber"
        placeholder="Card Number"
        style={INPUT_STYLE}
        value={cardNumber}
        onChange={e => setCardNumber(e.target.value)}
      />

      <Input
        id="cvv"
        placeholder="CVV"
        style={INPUT_STYLE}
        value={cvv}
        onChange={e => setCvv(e.target.value)}
      />

      {!isAlternateDateFormat && (
        <Input
          id="expiration-date"
          placeholder="Expiration Date"
          style={INPUT_STYLE}
          value={expDateFull}
          onChange={e => setExpDateFull(e.target.value)}
        />
      )}

      {isAlternateDateFormat && (
        <div>
          <Select
            id="expiration-month"
            style={SELECT_STYLE}
            value={expMonth}
            onChange={val => setExpMonth(val)}
          >
            {MONTHS.map(x => (
              <Select.Option key={x.value} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            id="expiration-year"
            style={SELECT_STYLE}
            value={expYear}
            onChange={val => setExpYear(val)}
          >
            {YEARS.map(x => (
              <Select.Option key={x.value} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}

      <SwitchWrap>
        <Switch
          checked={isAlternateDateFormat}
          onChange={toggleDateFormat}
        />
        &nbsp; Alternate Expiration Format
      </SwitchWrap>

      <Button style={BTN_STYLE} onClick={onSubmit}>
        Save Credit Card
      </Button>
    </>
  );
}
