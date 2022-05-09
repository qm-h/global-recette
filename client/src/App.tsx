import { useEffect, useState } from 'react';


const  App = () => {

  const [data, setData] = useState<any>([{}])

  useEffect(() => {
    fetch('/api').then(response => response.json()).then(data => setData(data))
  }, [])
  
    const result = data.users === undefined ? (<p>Load..</p>) : (data.users.map((user, i) => <p key={i}> {user}</p>
    ))
    console.log(result)
  
  return (
    <div>
      {result}
    </div>
  );
}

export default App;
