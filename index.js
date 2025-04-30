    var data = [];
    var counter = 0;


    let saved = localStorage.getItem('tasks');
    if(saved){
        data= JSON.parse(saved)
        counter= data.length;
        showTasks();
    }
  
    function addTask(e) {
        e.preventDefault();
        let a = document.getElementById("taskInput");
        let task = a.value;
        if (task) {
        data.push( {
            id: counter,
            name: task,
            done: false
        });
        a.value = "";
        localStorage.setItem('tasks',JSON.stringify(data))
        showTasks();
        }
    }
  
    function showTasks() {
        let ul = document.getElementById("taskList");
        ul.innerHTML = ""; 

        let fragment = document.createDocumentFragment();

        for (let j = 0; j < data.length; j++) {
        if (data[j]) {
            let li = document.createElement("li");
            li.className = "d-flex justify-content-center align-items-center mb-2";

            // add checkbox
            let checkbox= document.createElement('input');
            checkbox.type='checkbox';
            checkbox.checked=data[j].done;
            checkbox.className='form-check-input';
            checkbox.style.cursor='pointer'
            checkbox.onclick=()=>toggle(j);

            //create task text 
            let taskText= document.createElement("span");
            taskText.textContent=data[j].name;
            taskText.style.margin='0 0.5rem';
            taskText.style.textDecoration = data[j].done? "line-through" : "";
            
            
            //create Toggle Button
            let toggleBtn= document.createElement('button');
            toggleBtn.className='btn btn-info ms-2 me-1';
            toggleBtn.textContent='Toggle';
            toggleBtn.onclick=()=> toggle(j);
            

            //create Delete Button
            let deleteBtn= document.createElement('button');
            deleteBtn.className='btn btn-danger';
            deleteBtn.textContent='Delete';
            deleteBtn.onclick=()=>{
                if(deleteBtn.textContent==='Delete'){
                    deleteBtn.textContent='Confirm';
                    deleteBtn.classList.remove('btn-danger');
                    deleteBtn.classList.add('btn-warning');
                }else
                    deleteTask(j)};
                
                

            //append everything
            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(toggleBtn);
            li.appendChild(deleteBtn);
            fragment.appendChild(li);
        }
        }
        ul.appendChild(fragment)
    }
  
    function toggle(index) {
        data[index].done = !data[index].done;
        showTasks();
    }
  
    function deleteTask(i) {
        
        data.splice(i,1) 
        showTasks();
    }
  
      // Extra confusing logic
    // setInterval(() => {
    //     var allDone = true;
    //     for (var z = 0; z < data.length; z++) {
    //     if (data[z] && data[z].done === false) {
    //         allDone = false;
    //     }
    //     }
    //     if (allDone && data.length > 0) {
    //     console.log("All tasks done!");
    //     }
    //   }, 10000);
  