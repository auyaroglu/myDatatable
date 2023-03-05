import { useEffect, useState } from "react";
import MyTable from "./components/MyTable"
/* 
    You can use "number" format for currency data

    this types uses for searching and sorting process
    type: "number" -> integer
    type: "date" -> date (for sorting options)
    type: "text" -> text-string
    type: "content" -> <div searchabletext={`${user.firstName} - ${user.lastName}`}>{user.firstName} - {user.lastName}</div> inside of HTML
    contentType: "number" - "text" (if primary type choosed as content we should send second parameter)
    
    <div searchabletext={`Example Text`}>Example Text</div> -> searchableText is necessary for search and sorting for "text" types
*/
function App() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://dummyjson.com/users?limit=100')
            .then(res => res.json())
            .then(data => setUsers(data.users))
        }
        
        fetchData()
    }, [])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <div className="App">
            {users.length > 0 && (
                <MyTable
                    columnFilter={true}
                    searchable={true}
                    pagination={10}
                    head={[
                        { title: 'ID', sortable: true, type: "number", show: true },
                        { title: 'Full Name', sortable: true, type: "content", contentType: "text", show: true },
                        { title: 'Age', sortable: true, type: "number", show: true },
                        { title: 'Birth Date', sortable: true, type: "date", show: true },
                        { title: 'Salary', sortable: true, type: "currency", show: true },
                        { title: 'Operation', width: 200, show: false }
                    ]}
                    body={users.map(user => ([
                        user.id,
                        <div searchabletext={`${user.firstName} ${user.lastName}`}>{user.firstName} {user.lastName}</div>,
                        user.age,
                        <div searchabletext={user.birthDate}>{user.birthDate}</div>,
                        `${formatter.format(Math.floor(Math.random() * 1000000) + 1000)}`,// random salary                     
                        <div>
                            <button className='my-edit'>Edit</button>
                            <button className='my-delete'>Delete</button>
                        </div>
                    ]))}
                />
            )}
        </div>
    );
}

export default App;
