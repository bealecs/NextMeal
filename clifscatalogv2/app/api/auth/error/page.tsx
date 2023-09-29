import Link from "next/link"

export default function Error() {
  
  return (
    <section style={{height:'100vh', textAlign:'center',width:'100%',margin:'auto'}}>
      <h4>Something went wrong with your sign in attempt</h4>
      <p>Please ensure you have typed the correct username & password</p>
      <br />
      <Link href="/signin">Attempt sign in again</Link>
      <p>Do not have an account? Click <a href="/signup">here</a></p>
    </section>
  )
}
//use prisma find many for unique email constraint on sign up