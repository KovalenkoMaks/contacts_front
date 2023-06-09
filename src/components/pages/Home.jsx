import React from 'react';

import { useEffect, useState } from 'react';
import { db } from 'components/db/config';
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    endBefore,
    doc,
    deleteDoc,
} from 'firebase/firestore';
import NameInput from 'components/nameInput/NameInput';
import Filter from 'components/filter/Filter';
import Contacts from 'components/contacts/Contacts';
import { getContact } from 'components/API/contacts';

function Home() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [dataForRender, setDataForRender] = useState([]);
    const [page, setPage] = useState(1);

    const limitPerPage = 6;
    const contactsCollect = collection(db, 'contacts');

    useEffect(() => {
        getContact(setData, setDataForRender);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showNext = async () => {
        try {
            const lastVisible = dataForRender[dataForRender.length - 1].createdAt;
            const nextQuery = query(
                contactsCollect,
                orderBy('createdAt'),
                startAfter(lastVisible),
                limit(limitPerPage),
            );
            const nextSnapshots = await getDocs(nextQuery);
            const nextData = nextSnapshots.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDataForRender(nextData);
        } catch (error) {
            console.log(error.message);
        }
        setPage((prev) => prev + 1);
    };
    const showPrev = async () => {
        try {
            const firstVisible = dataForRender[0].createdAt;
            const prevQuery = query(
                contactsCollect,
                orderBy('createdAt'),
                endBefore(firstVisible),
                limit(limitPerPage),
            );
            const nextSnapshots = await getDocs(prevQuery);
            const nextData = nextSnapshots.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDataForRender(nextData);
        } catch (error) {
            console.log(error.message);
        }
        setPage((prev) => prev - 1);
    };
    const del = async (id) => {
        try {
            const contact = doc(db, 'contacts', id);
            await deleteDoc(contact);
            getContact(setData, setDataForRender);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <NameInput
                contactsCollect={contactsCollect}
                setDataForRender={setDataForRender}
                setData={setData}
            />
            <Filter setFiltredContacts={setFilter} />
            <Contacts
                del={del}
                contacts={data}
                setDataForRender={setDataForRender}
                filter={filter}
                dataForRender={dataForRender}
            />
            <div className="text-center">
                <button
                    className="btn btn-dark col-md-2  mb-5"
                    disabled={page === 1}
                    onClick={() => showPrev({ item: dataForRender[0] })}
                >
                    Prev
                </button>
                <button
                    className="btn btn-dark col-md-2 ms-5 mb-5"
                    disabled={page * limitPerPage >= data.length}
                    onClick={() => showNext({ item: dataForRender[dataForRender.length - 1] })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
