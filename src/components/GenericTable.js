import { Table } from "react-bootstrap";

function GenericTable(props) {

    return (
        <Table responsive striped bordered hover size="large">
            <thead className="bg-primary text-white table-head-pointer">
                <tr>
                    {props.headers.map((header, index) => (
                        <th key={index} onClick={() => props.handleSort(header)}>
                            {header + "   " + props.getArrow()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </Table>
    );
}

export default GenericTable;
