export function reportPreview  (reportData, b, c) {
    console.log(b+c)
    return `
        <tr>
            <td>
                ${reportData.id}
            </td>
            <td>
                ${reportData.title}
            </td>
            <td>
                ${reportData.status}
            </td>
            <td>
                ${reportData.itemName}
            </td>
            <td>
                ${reportData.date}
            </td>
            <td>
                ${reportData.supplierName}
            </td>
            <td>
                ${reportData.startedBy}
            </td>
            <td>
                ${reportData.description}
            </td>
            <td>
                <div>
                    <button>View Report</button>
                    <button>Edit</button>
                </div>
            </td>
        </tr>
    `
}   

// export  function reportPreview(
//     report) {

//     return `
//         <tr>
//             <div>${report.title}</div>
//             <div>${report.title}</div>
//             <td>${report.status}</td>
//             <td>${report.itemName}</td>
//             <td>${report.date}</td>
//             <td>${report.supplierName}
//             <td>${report.startedBy}</td>
//             <td>${report.description}</td>
//         </tr>
//     `
// }