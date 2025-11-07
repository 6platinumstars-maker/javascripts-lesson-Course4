const employees = [
      { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000 , spesilaization:'javascripts'},
      { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000  , spesilaization:'Java'},
      { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000 , spesilaization:'javascripts' },
      { id: 2, name: 'Maya Newgate', age: 25, department: 'HR', salary: 80000  , spesilaization:'python'},
      //... ここにさらに従業員の記録を追加できます
    ];

// 1.すべての従業員を表示する関数
function displayEmployees() {
    const totalEmployees = employees
        .map(employee => `<p>${employee.id}: ${employee.name} - ${employee.department} - $${employee.salary}- ${employee.spesilaization}</p>`)
        .join('');
    document.getElementById('employeesDetails').innerHTML = totalEmployees;
}
// 2.総給料を計算してメッセージアラートを出す関数
function calculateTotalSalaries() {
      const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);
      alert(`Total Salaries: $${totalSalaries}`);
    }
// 3.HR部門の従業員のみを表示する。
function displayHREmployees() {
     const hrEmployees = employees.filter(employee => employee.department === 'HR');
      const hrEmployeesDisplay = hrEmployees.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
      document.getElementById('employeesDetails').innerHTML = hrEmployeesDisplay;
}

// 4.ID2の従業員を探して表示
function findEmployeeById(employeeId) {
      const foundEmployee = employees.find(employee => employee.id === employeeId);
      if (foundEmployee) {
      document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
      }
      else{
        document.getElementById('employeesDetails').innerHTML = 'このIDの従業員は見つかりませんでした';
       }
   }

 // 5.javascriptsの従業員を探して表示
function findEmployeeBySpe() {
      const foundEmployeespe = employees.filter(employee => employee.spesilaization === 'javascripts');
       const foundEmployeespeDISPLAY = foundEmployeespe.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
      document.getElementById('employeesDetails').innerHTML = foundEmployeespeDISPLAY;

   }  
