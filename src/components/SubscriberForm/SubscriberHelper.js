import config from '../../config';


export default function AddSubscriber(e){
    e.preventDefault();
    const {email} = e.target;
    console.log(email, 'email');
    fetch(`${config.ENDPOINT}/email/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({email: email.value})
    }).then(res=>{
        console.log(res, 'posted');
    }).catch(err=>{
        console.log(err, 'Error Occured')
    });
}