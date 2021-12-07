import React from 'react'



export default function ListOfData({ emi, interest, tenure, principal }) {

    let r = interest / 1200;
    let pMonth = Math.round(Math.floor(emi / (Math.pow((1 + r), tenure))));
    let interestPerMonth = emi - pMonth;
    let balance = principal - pMonth;

    let sum = 0;


    let paymentMonthsArr = [];
    for (let i = tenure; i >= 1; i--) {
        if (balance < 0)
            balance = 0;

        sum = sum + pMonth;
        let res = ((sum / principal)*100).toFixed(2) ;
        if(res>100)
        res = 100;

        paymentMonthsArr.push(
            <tr >
                <td>{tenure - i + 1}</td>
                <td>₹ {pMonth}</td>
                <td>₹ {interestPerMonth}</td>
                <td>₹ {emi}</td>
                <td>₹ {balance}</td>
                <td>{res}%</td>
            </tr>
        );
        pMonth = Math.round(emi / (Math.pow((1 + r), i - 1)));
        interestPerMonth = emi - pMonth;
        balance = balance - pMonth;
    }

    //console.log(paymentMonthsArr);
    return (

        <table className="paymentsCalculatorTable">
            <thead>
                <tr>
                    <th>Month </th>
                    <th>Principal <br /> (A)</th>
                    <th >Interest <br />(B)</th>
                    <th>Total Payment <br /> (A+B)</th>
                    <th >Balance</th>
                    <th>Loan Paid <br /> Till date</th>

                </tr>
            </thead>
            <tbody>
                {paymentMonthsArr}
            </tbody>
        </table>
    )
}


