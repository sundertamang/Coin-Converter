import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import { RiCoinsLine } from 'react-icons/ri';

function Converter() {
  const apiurl = "https://api.coingecko.com/api/v3/exchange_rates";
  const [cryptoList, setcryptoList] = useState([]);

  const defaultFirstValue = "Bitcoin";
  const defaultSecondValue = "Ether";

  const [InputValue, SetInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondValue);
  const [result,setResult] = useState('0');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(cryptoList == 0) return

    const firstselectRates = cryptoList.find((item)=>{
        return item.value == firstSelect;
    }).rates

    const secondselectRates = cryptoList.find((item)=>{
        return item.value == secondSelect;
    }).rates

    const resultValue = (InputValue * secondselectRates)/firstselectRates;
    setResult(resultValue.toFixed(6))

  },[InputValue,firstSelect,secondSelect])
  async function fetchData() {
    const response = await fetch(apiurl);
    const jsonDAta = await response.json();

    const data = jsonDAta.rates;

    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rates: item[1].value,
      };
    });
    console.log(tempArray);
    setcryptoList(tempArray);
  }

  return (
    <div className="Container">
      <Card className="Crypto-card" title={<h1><RiCoinsLine/>crypto-converter</h1>}>
        <Form size="Large">
          <Form.Item>
            <Input
              onChange={(event) => {
                SetInputValue(event.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            onChange={(value) => {
              setFirstSelect(value);
            }}
            style={{ width: "160px" }}
            defaultValue={defaultFirstValue}
            options={cryptoList}
          ></Select>
          <Select
            onChange={(value) => {
              setSecondSelect(value);
            }}
            style={{ width: "160px" }}
            defaultValue={defaultSecondValue}
            options={cryptoList}
          ></Select>
        </div>
        <p>{InputValue}{firstSelect} = {result}{secondSelect}</p>
      </Card>
    </div>
  );
}

export default Converter;
