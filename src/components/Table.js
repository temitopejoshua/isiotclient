import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Clients from './Clients';
import Pagination from './Pagination';
import TablePagination from './TablePagination';

const Table = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState (false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(10);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setClients(res.data);
            setLoading(false);
        }

        fetchClients(); 
    },[]);

    console.log(clients);

    //Get current Clients
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexofFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexofFirstClient, indexOfLastClient);
     
    //ChangePage
    const paginate =(pageNumber) => setCurrentPage(pageNumber);

    return(
        <div className="container mt-5">
            <h1 className="text-primary mb-3">My Table</h1>
            <Clients 
            clients={currentClients} 
            loading={loading} 
            />
            <Pagination 
            clientsPerPage={clientsPerPage} 
            totalClients={clients.length} 
            paginate={paginate}
            />
            <TablePagination/>
        </div>
    );
}

export default Table;