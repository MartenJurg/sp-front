import React, {useEffect} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import Table from "react-bootstrap/Table";


const Deals = () => {
    const {deals, price, duration} = useStoreState(state => state.deal)
    const {fetchAllDeals, fetchStatuses, addNewDeal, updateDeal, setChosenDeal, setDuration, setPrice} = useStoreActions(actions => actions.deal)
    const {checkToken} = useStoreActions(actions => actions.token)

    useEffect(() => {
        setDuration("")
        setPrice("")
        checkToken()
        fetchAllDeals()
        fetchStatuses()
    }, [])

    const deactivate = id => {
        setChosenDeal(id)
        updateDeal(3)
    }

    const activate = id => {
        setChosenDeal(id)
        updateDeal(2)
    }

    const deleteDeal = id => {
        setChosenDeal(id)
        updateDeal(4)
    }

    const addDeal = () => {
        addNewDeal()
    }

    const dealsRow = (value) => {
        return (
            <tr>
                <td>{value.id}</td>
                <td>{value.cost}</td>
                <td>{value.duration}</td>
                <td>
                    {value.dealStatus.name}
                </td>
                <td >
                    {value.dealStatus.name === "ACTIVE"
                        ? <a onClick={() => deactivate(value.id)} > DEACTIVATE </a>
                        : <a onClick={() => activate(value.id)} > ACTIVATE </a>}
                </td>
                <td><a onClick={() => deleteDeal(value.id)}> DELETE </a></td>
            </tr>
        )
    }

    return (
        <div className="text-center mt-4">
            <h2>PAKKUMISED</h2>

            <div className="row justify-content-center mt-4">
                <div className="col-8">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Hind</th>
                            <th>Kestvus</th>
                            <th>Staatus</th>
                            <th>{" "} </th>
                            <th> {" "}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>#</td>
                            <td><input value={price} onChange={(e) => setPrice(e.target.value)} className="w-75" /></td>
                            <td><input value={duration} onChange={(e) => setDuration(e.target.value)} className="w-75" /></td>
                            <td>--</td>
                            <td><a onClick={addDeal}> ADD </a> </td>
                            <td> {" "}</td>
                        </tr>
                        {deals.map((value) => {
                            console.log(value)
                            return dealsRow((value))
                        })}

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Deals;