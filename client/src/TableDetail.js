import React from 'react'

export default function TableDetail(props) {
    return (
        <div>
            <div className="cell">
            <tr><strong>Loan EMI</strong></tr>
            <td><strong> ₹ </strong>{props.emi}</td>
            </div>

            <div className="cell">
                <tr><strong>Total Interest Payable</strong></tr>
                <td><strong> ₹ </strong>{props.totalAmountOfInterest - props.totalAmount}</td>
            </div>

            <div className="cell">
                <tr><strong>Total Payment</strong></tr>
                <tr>(Principal + Interest)</tr>
                <td><strong> ₹ </strong>{props.totalAmountOfInterest}</td>
            </div>
            
        </div>
    )
}
