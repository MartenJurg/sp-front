import React, {useEffect} from "react";
import Table from "react-bootstrap/Table";
import {useStoreActions, useStoreState} from "easy-peasy";

const Invoices = () => {
    const { notPaidInvoices, paidInvoices } = useStoreState(state => state.invoice)
    const {fetchAllInvoices, fetchPaid, fetchNotPaid, markInvoiceAsPaid} = useStoreActions(actions => actions.invoice)
    const {checkToken} = useStoreActions(actions => actions.token)

    useEffect( () => {
        checkToken()
        fetchAllInvoices()
        fetchNotPaid()
        fetchPaid()
    }, [])

    const onClickAction = id => {
        markInvoiceAsPaid(id)
    }

    const invoiceRow = (value) => {
        return (
            <tr>
                <td>{value.id}</td>
                <td>{value.deal.cost}€, {value.deal.duration} päeva</td>
                <td>Link</td>
                { value.invoiceStatus.name === "GENERATED" || value.invoiceStatus.name === "SENT"
                    ?<td >
                        <a onClick={() => onClickAction(value.id)} > <h2>+</h2> </a>
                    </td>
                    : ""
                }

            </tr>
        )
    }

    return (
        <div>
            <div className="text-center mt-4">
                <h2>ARVED</h2>

                <div className="row justify-content-center mt-4">
                    <div className="col-8">
                        <h5>Maksmata</h5>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Arve number akki</th>
                                <th>Pakkumine</th>
                                <th>PDF</th>
                                <th>Märgi makstuks</th>

                            </tr>
                            </thead>
                            <tbody>
                            {notPaidInvoices.map((value) => {
                                return invoiceRow((value))
                            })}

                            </tbody>
                        </Table>
                        <h5>Makstud</h5>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Arve number akki</th>
                                <th>Pakkumine</th>
                                <th>PDF</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paidInvoices.map((value) => {
                                return invoiceRow((value))
                            })}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoices;