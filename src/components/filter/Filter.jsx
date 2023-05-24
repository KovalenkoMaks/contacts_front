
const Filter = ({ setFiltredContacts }) => {
    return (
        <>
            <h2>Find contacts by name</h2>
            <input
                className="rounded form-control w-25"
                placeholder="Find"
                type="text"
                name="filter"
                onChange={e => setFiltredContacts(e.target.value)}
            />
        </>
    );
}
export default Filter