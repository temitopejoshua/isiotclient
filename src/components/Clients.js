import React from  'react'



const Clients = ({ clients, loading }) => {
    if (loading){
        return <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    }

    return <ul className="list-group mb-4">
        {clients.map(client => (
            <li key={client.id} className="list-group-item">
                {clients.name}
            </li>
        ))}
    </ul>;
}

export default Clients;



