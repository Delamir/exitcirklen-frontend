

function Table(props) {

    const { headers } = props;

    return (
        <Table striped bordered hover size="large">
            <thead className="bg-primary">
            <tr>
                { headers.map((header) => <th>{header}</th>) }
            </tr>
            </thead>
            <tbody>
            { props.children }
            </tbody>
        </Table>
    );
}

export default Table;