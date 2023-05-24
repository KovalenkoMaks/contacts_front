import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from 'components/edit/Edit';
import { useState } from 'react';


const Contacts = ({ contacts, filter, dataForRender, del }) => {
    const [isModal, setIsModal] = useState(false)
    const [id, setId] = useState('')

    let filteredArr = []
    if (filter.length > 0) {
        filteredArr = contacts.filter(e =>
            e.name.toLowerCase().includes(filter.toLowerCase()))
    }

    return (
        <section>
            <h2>Contacts</h2>
            {!filter && <ul className="list-group container text-center d-flex flex-row flex-wrap mb-5 ">
                {dataForRender.map(e => {
                    return (
                        <li key={e.id} className="list-group-item col-6 border-top">
                            <p className="fs-4 text-left">
                                {e.name} {e.lastName}: {e.phone}
                            </p>
                            <p className="fs-4 text-left">Email: {e.email}</p>
                            <p className="fs-4 text-left">Дата Народження: {e.dateOfBirth}</p>
                            <button
                                className="btn btn-danger col-md-2"
                                type="button"
                                onClick={() => del(e.id)}
                            >
                                Delete
                            </button>
                            <button className="btn btn-secondary ms-3 col-md-2" type="button" onClick={() => {
                                setIsModal(true);
                                setId(e.id)
                            }}> Edit</button>
                        </li>
                    );
                })}

            </ul>}

            {filter && filteredArr.length > 0 && <ul className="list-group container text-center d-flex flex-row flex-wrap mb-5 ">
                {filteredArr.map(e => {
                    return (
                        <li key={e.id} className="list-group-item col-6 border-top ">
                            <p className="fs-4 text-left">
                                {e.name} {e.lastName}: {e.phone}
                            </p>
                            <p className="fs-4 text-left">Email: {e.email}</p>
                            <p className="fs-4 text-left">Дата Народження: {e.dateOfBirth}</p>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => del(e.id)}
                            >
                                Delete
                            </button>
                            <button className="btn btn-secondary ms-3 col-md-2" type="button" onClick={() => {
                                setIsModal(true)
                                setId(e.id)
                            }}> Edit</button>
                        </li>

                    );
                })}

            </ul>}

            {isModal && <Edit isModal={isModal} setIsModal={setIsModal} contacts={dataForRender} id={id} />}


        </section>
    );
}

export default Contacts;