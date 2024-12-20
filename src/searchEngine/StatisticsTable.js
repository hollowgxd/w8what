import React from "react";
//потом реворкнем сделаем вывод на страничку отсюда

const StatisticsTable = ({ title, data }) => {
    return (
        <div className="statistics-table">
            <h3>{title}</h3>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>{title}</th>
                    <th>Упоминаний</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticsTable;
