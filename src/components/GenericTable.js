import { Table } from "react-bootstrap";

function GenericTable(props) {
    return (
        <Table striped bordered hover size="large">
            <thead className="bg-primary text-white-50">
                <tr>
                    {props.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </Table>
    );
}

export default GenericTable;
