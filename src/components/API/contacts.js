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
import { db } from 'components/db/config';

const limitPerPage = 6;
const contactsCollect = collection(db, 'contacts');

export const getContact = async (setData, setDataForRender) => {
    const first = query(contactsCollect, orderBy('createdAt'), limit(limitPerPage));
    try {
        const data = await getDocs(contactsCollect);
        const parsed = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setData(parsed);
        const firstPage = await getDocs(first);
        const documentSnapshots = firstPage.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setDataForRender(documentSnapshots);
    } catch (error) {
        console.log(error.message);
    }
};
