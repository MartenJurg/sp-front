import React, {useEffect} from "react";
import Table from "react-bootstrap/Table";
import {useStoreActions, useStoreState} from "easy-peasy";

const Categories = () => {

    const { categories, newCategory } = useStoreState(state => state.category)
    const {fetchAllCategories, setNewCategory, addCategory} = useStoreActions(actions => actions.category)
    const {checkToken} = useStoreActions(actions => actions.token)

    useEffect( () => {
        setNewCategory("")
        checkToken()
        fetchAllCategories()
    }, [])

    const addNewCategory = () => {
        addCategory()
    }

    const CategoryRow = props => {
        return (
            <tr>
                <td>{props.category.id}</td>
                <td>{props.category.name}</td>
            </tr>
        )
    }

    return (
        <div>
            <div className="text-center mt-4">
                <h2>KATEGOORIAD</h2>

                <div className="row justify-content-center mt-4">
                    <div className="col-8">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Nr</th>
                                <th>Nimetus</th>

                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td><a onClick={addNewCategory}> ADD </a> </td>
                                <td><input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-75" /></td>
                            </tr>
                            {categories.map((value) => {
                                return <CategoryRow category={value} />
                            })}

                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;