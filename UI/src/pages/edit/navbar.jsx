export default function Navbar(){
  return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
           <div class="container-fluid">
          <a class="navbar-brand" href="index.html">Admin</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="index.html">Home</a>
          <a class="nav-link" href="employees.html">Employees</a>
          <a class="nav-link" href="new.html">New Employee</a>
          
    </div>
  </div>
</div>
</nav>
  )
}