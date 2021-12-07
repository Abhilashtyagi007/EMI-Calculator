import React, { useState } from 'react';
import { Slider, withStyles } from '@material-ui/core';
import './App.css';
import TableDetails from './TableDetail';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import Axios from 'axios';
import ListOfData from './ListOfData';

import SliderMarks from './SliderMarks';
Chart.register(ArcElement);

const PrettoSlider = withStyles({
  root: { color: 'Orange', height: 10 },
  thumb: { height: 25, width: 25, backgroundColor: 'white', border: '2px solid black', marginTop: -8, marginLeft: -9 },
  track: { height: 10, borderRadius: 4 },
  rail: { height: 10, borderRadius: 4 },
})(Slider);

function App() {

  const [pAmount, setpAmount] = useState(100000);
  const [interest, setInterest] = useState(27);
  const [duration, setDuration] = useState(12);
  const maxValue = 20000000;
  const intMax = 20;
  const maxDuration = 360;

  const intr = interest / 1200;

  const emi = duration ? Math.round(pAmount * intr / (1 - (Math.pow(1 / (1 + intr), duration)))) : 0;
  const totalAmountToBePaid = duration * emi;
  const totalAmountOfCredit = Math.round((emi / intr) * (1 - Math.pow((1 + intr), (-duration))));
  const totalAmountOfInterest = Math.round(totalAmountToBePaid + totalAmountOfCredit);


  console.log(totalAmountOfInterest, totalAmountOfCredit, totalAmountToBePaid);

  const save = (e) => {

    e.preventDefault();
    Axios.post('http://localhost:4000/create', {
      amount: pAmount,
      interest: interest,
      tenure: duration,
      emi: emi,
      payableInterest: totalAmountToBePaid - pAmount,
      totalPayment: totalAmountToBePaid


    }).then(() => {
      console.log("Success");
    })
  };


  return (
    <div className="App">
      <div className="CalApp">

        <form onSubmit={save}>
          <div >
            <span className="text">
              <label >Home Loan Amount</label>
              <input type="number" value={pAmount} onChange={(e) => setpAmount(e.target.value)} />
              <button>₹</button>
            </span>


            <PrettoSlider value={pAmount} marks={SliderMarks.marksAmt} onChange={(event, vAmt) => { setpAmount(vAmt) }} defaultValue={pAmount} max={maxValue}></PrettoSlider>
          </div>

          <div>
            <span className="text">
              <label >Interest Rate</label>
              <input type="number" value={interest} onChange={(e) => setInterest(e.target.value)} />%
            </span>

            <PrettoSlider value={interest} marks={SliderMarks.marksInt} onChange={(event, vInt) => { setInterest(vInt) }} max={intMax} defaultValue={interest}></PrettoSlider>
          </div>

          <div>
            <span className="text">
              <label >Loan Tenure</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} /><button>  Yr</button><button> Mo </button>
            </span>

            <PrettoSlider
              value={duration} marks={SliderMarks.marksTenure} onChange={(event, vDur) => { setDuration(vDur) }} max={maxDuration}
              defaultValue={duration}
            ></PrettoSlider>
          </div>

          <div className='btn'>
            <button onClick={save}>Save to the database</button>
          </div>

        </form>


        <div className="bottom">

          <div className="bottom_left">
            <TableDetails
              pAmount={pAmount}
              interest={interest}
              duration={duration}
              emi={emi}
              totalAmountOfInterest={totalAmountToBePaid}
              totalAmount={totalAmountOfCredit}>
            </TableDetails>
          </div>

          <div className="bottom_right">
            <Pie
              //chartType="PieChart"
              data={{
                labels: ['Total Interest', 'Total Amount'],
                datasets: [{
                  data: [100 - totalAmountOfInterest - totalAmountToBePaid, totalAmountOfInterest - totalAmountToBePaid],
                  backgroundColor: ['orange', 'green']
                }],
              }}
              width={100}
              height={100}

              options={{
                tooltips:{
                  enable: true
                },
                title: '5',
                plugins: {
                  position: 'bottom',
                }

              }}
            />

          </div>
        </div>
      </div>

      <div>
        <ListOfData
          emi={emi}
          tenure={duration}
          interest={interest}
          principal={pAmount}
        />
      </div>

    </div >
  );
}

export default App;
