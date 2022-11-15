import {useEffect, useState} from "react";


function Table(props) {
    const headers = props.headers
    // const [headers, setHeaders] = useState([]);
    // useEffect(()=> setHeaders(props.headers),[])

    return (
        <Table striped bordered hover size="large">
            <thead className="bg-primary">
            <tr>
                { headers?.map((header, index) => <th key={index}>{header}</th>) }
            </tr>
            </thead>
            <tbody>
            { props.children }
            </tbody>
        </Table>
    );
}

export default Table;