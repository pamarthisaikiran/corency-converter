import {Component} from 'react'

import './index.css'

class ConverterA extends Component {
  state = {
    currencies: [
      'ALL',
      'AMD',
      'ANG',
      'AOA',
      'ARS',
      'CAD',
      'AUD',
      'USD',
      'AUD',
      'PHP',
      'SCR',
      'INR',
      'EUR',
      'AED',
      'AFN',
    ],
    base: 'USD',
    amount: '',
    convertTo: 'EUR',
    result: '',
    date: '',
  }

  handleSelect = event => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      this.calculate,
    )
  }

  handleInput = event => {
    this.setState(
      {
        amount: event.target.value,
      },
      this.calculate,
    )
  }

  calculate = async () => {
    const {base, amount, convertTo, result, date} = this.state

    if (amount !== null) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/64af594db16487b902ecab32/latest/${base}`,
      )
      const data = await response.json()
      console.log(data)
      this.setState({
        result: data.conversion_rates[convertTo] * amount,
        date: data.time_last_update_utc,
      })
    }
  }

  render() {
    const {currencies, base, amount, convertTo, result, date} = this.state

    return (
      <div className="container">
        <h1 className="heading">
          {amount} {base} is Equal to{' '}
        </h1>
        <h1 className="heading">
          {result} {convertTo}{' '}
        </h1>
        <p className="para">Date : {date}</p>
        <div>
          <div>
            <form>
              <input
                className="input-a"
                type="number"
                value={amount}
                onChange={this.handleInput}
              />

              <select
                className="select"
                name="base"
                value={base}
                onChange={this.handleSelect}
              >
                {currencies.map(each => (
                  <option className="option" value={each} key={each}>
                    {each}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="sign">
            <h1>=</h1>
          </div>
          <div>
            <form>
              <input className="input-b" disabled="true" value={result} />
              <select
                className="select"
                name="convertTo"
                value={convertTo}
                onChange={this.handleSelect}
              >
                {currencies.map(each => (
                  <option selected="EUR" value={each} key={each}>
                    {each}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ConverterA
