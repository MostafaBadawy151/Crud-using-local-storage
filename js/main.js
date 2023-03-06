//************************* Global ***************************
let productNameInp = document.getElementById('productName');
let productPriceInp = document.getElementById('productPrice');
let productCategoryInp = document.getElementById('productCategory');
let productDescInp = document.getElementById('productDesc');
let tableBody = document.querySelector('#tableBody')
let temp;

let productsContainer = [];
if (localStorage.getItem("todayProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("todayProducts"));
    displayProducts();
}

//************************* Functions ***************************

// ------ Add Product to local storage --------------
function addProduct() {
    if (validationProductName() && validationProductPrice() && validationProductCategory()) {
        let product = {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        if (document.getElementById('btn-updated').innerHTML != 'Update Product') {
            productsContainer.push(product);
            displayProducts();
            clearInputsForm();
        } else {
            productsContainer[temp] = product;
            document.getElementById('btn-updated').innerHTML = 'Add Product';
        }   
        console.log(productsContainer);
        localStorage.setItem("todayProducts", JSON.stringify(productsContainer));
    }
    else(alert('Enter a valid input'))
        
    } 
//--------------- display Product  --------------
function displayProducts() {
    // display from local storage
    if (document.querySelector('#tableBody').innerHTML=='') { 
        console.log('hello');
        for (let i = 0; i < productsContainer.length; i++) {
        
            const row = document.createElement('tr');
            const index = document.createElement('td')
            const name = document.createElement('td')
            const price = document.createElement('td')
            const category = document.createElement('td')
            const description = document.createElement('td')
            const updateBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            updateBtn.classList.add('btn', 'btn-warning' ,'btn-sm','updbtn')
            updateBtn.innerText='Update';
            deleteBtn.classList.add('btn', 'btn-danger' ,'btn-sm' , 'deletebtn')
            deleteBtn.innerText='Delete';
            index.innerText = `${i+1}`;
            name.innerText = `${productsContainer[i].name}`;
            price.innerText = `${productsContainer[i].price}`;
            category.innerText = `${productsContainer[i].category}`;
            description.innerText = `${productsContainer[i].desc}`;
            row.appendChild(index)
            row.appendChild(name)
            row.appendChild(price)
            row.appendChild(category)
            row.appendChild(description);
            row.appendChild(updateBtn);
            row.appendChild(deleteBtn);
            $('#tableBody').append(row);
            
            
        }}
    // append one product 
        else{
            console.log('bye');
                const row = document.createElement('tr');
                const index = document.createElement('td')
                const name = document.createElement('td')
                const price = document.createElement('td')
                const category = document.createElement('td')
                const description = document.createElement('td')
                const updateBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');
                index.innerText = `${productsContainer.length}`;
                name.innerText = `${productsContainer[(productsContainer.length)-1].name}`;
                console.log(productsContainer);
                price.innerText = `${productsContainer[(productsContainer.length)-1].price}`;
                category.innerText = `${productsContainer[(productsContainer.length)-1].category}`;
                description.innerText = `${productsContainer[(productsContainer.length)-1].desc}`;
                updateBtn.classList.add('btn', 'btn-warning' ,'btn-sm','updbtn')
                updateBtn.innerText='Update';
                deleteBtn.classList.add('btn', 'btn-danger' ,'btn-sm', 'deletebtn')
                deleteBtn.innerText='Delete';
                row.appendChild(index)
                row.appendChild(name)
                row.appendChild(price)
                row.appendChild(category)
                row.appendChild(description);
                row.appendChild(updateBtn);
                row.appendChild(deleteBtn);
                $('#tableBody').append(row);
    
        }
        
    }
//-----clear Function---------------------------------
    function clearInputsForm() {
        productNameInp.value = "";
        productPriceInp.value = "";
        productCategoryInp.value = "";
        productDescInp.value = "";
    }
// ***************** Delete Product **********************
    for (let i = 0; i < productsContainer.length; i++) {
        document.querySelectorAll('.deletebtn')[i].addEventListener('click',()=>{
            productsContainer.splice(i, 1);
            localStorage.setItem("todayProducts", JSON.stringify(productsContainer))
            console.log(productsContainer);
            let deletedProduct = document.querySelectorAll('tr')[i+1]
            deletedProduct.remove()
        })
         }
// ***************** Update Product **********************

         for (let i = 0; i < productsContainer.length; i++) {
            
            document.querySelectorAll('.updbtn')[i].addEventListener('click',()=>{
                productNameInp.value = productsContainer[i].name;
                console.log(productNameInp.value);
                productPriceInp.value = productsContainer[i].price;
                productCategoryInp.value = productsContainer[i].category;
                productDescInp.value = productsContainer[i].desc;
                document.getElementById('btn-updated').innerHTML = 'Update Product';
                temp =i;
                let updatedProduct = document.querySelectorAll('tr')[i+1];
                updateValues(updatedProduct);
                console.log(updatedProduct);
            })
             }
             function updateValues(updatedProduct) {
                    document.querySelector('#btn-updated').addEventListener('click',()=>{
                        updatedProduct.children[1].innerText =  productNameInp.value;
                        console.log(productNameInp.value);
                        updatedProduct.children[2].innerText =  productPriceInp.value;
                        updatedProduct.children[3].innerText =  productCategoryInp.value;
                        updatedProduct.children[4].innerText =  productDescInp.value;
                        clearInputsForm();
                    })
                
                
             }
// ----------------------Search-----------------------
     function search(term) {
            for (let i = 0; i < productsContainer.length; i++) {
                if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
                    document.querySelectorAll('tr')[i+1].classList.remove('d-none')
                }
                else{
                    document.querySelectorAll('tr')[i+1].classList.add('d-none')
                }
            }
            }
// ***************** Events **********************
    document.querySelector('.btn-sub').addEventListener('click',()=>{
            addProduct()});

// ***************** Validation **********************
function validationProductName() {
    var regx = /^[A-Z][a-zA-Z]{3,8}$/;
    if (regx.test(productNameInp.value)) { return true; } else { return false; };
}

function validationProductPrice() {
    var regx = /^([1-9][0-9]{2}|1000)$/;
    if (regx.test(productPriceInp.value)) { return true; } else { return false; };
}

function validationProductCategory() {
    var regx = /^(mobile|tv|device)$/;
    if (regx.test(productCategoryInp.value)) { return true; } else { return false; };
}

function validationProductDescription() {
    var regx = /^.{0,500}$/;
    if (regx.test(productDescInp.value)) { return true; } else { return false; };
}

// ****************** Events *************************************
productNameInp.addEventListener('change',function(){
    if(validationProductName()){
        productNameInp.classList.add('is-valid');
        productNameInp.classList.remove('is-invalid');
    document.getElementById('btn-updated').classList.remove('disabled')
    }
    else{productNameInp.classList.add('is-invalid');
    productNameInp.classList.remove('is-valid');
    document.getElementById('btn-updated').classList.add('disabled')

}
})

productPriceInp.addEventListener('change',function(){
    if(validationProductPrice()){
        productPriceInp.classList.add('is-valid');
        productPriceInp.classList.remove('is-invalid');
    }
    else{productPriceInp.classList.add('is-invalid');
    productPriceInp.classList.remove('is-valid');
}

})

productCategoryInp.addEventListener('change',function(){
    if(validationProductCategory()){
        productCategoryInp.classList.add('is-valid');
        productCategoryInp.classList.remove('is-invalid');
    document.getElementById('btn-updated').classList.remove('disabled')
    }
    else{productCategoryInp.classList.add('is-invalid');
    productCategoryInp.classList.remove('is-valid');
    document.getElementById('btn-updated').classList.add('disabled')

}
    
})





    
    // Not using DOM


        //     cartona += ` <tr>
        //      <td>${i+1}</td>
        //      <td>${productsContainer[i].name}</td>
        //      <td>${productsContainer[i].price}</td>
        //      <td>${productsContainer[i].category}</td>
        //      <td>${productsContainer[i].desc}</td>
        //      <td><button class="btn btn-warning btn-sm" onclick="updateProduct(${i})">Update</button></td>
        //      <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        //  </tr>`
        
    







// function search(term) {
//     var cartona = ``;
//     for (var i = 0; i < productsContainer.length; i++) {
//         if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
//             cartona += ` <tr>
//         <td>${i+1}</td>
//         <td>${productsContainer[i].name}</td>
//         <td>${productsContainer[i].price}</td>
//         <td>${productsContainer[i].category}</td>
//         <td>${productsContainer[i].desc}</td>
//         <td><button class="btn btn-warning btn-sm">Update</button></td>
//         <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
//     </tr>`
//         }

//     }
//     document.getElementById('tableBody').innerHTML = cartona;
// }

// function updateProduct(index) {
//     productNameInp.value = productsContainer[index].name;
//     productPriceInp.value = productsContainer[index].price;
//     productCategoryInp.value = productsContainer[index].category;
//     productDescInp.value = productsContainer[index].desc;
//     document.getElementById('btn-updated').innerHTML = 'Update Product';
//     temp = index;
// }
// function deleteProduct(index) {
//     productsContainer.splice(index, 1);
//     localStorage.setItem("todayProducts", JSON.stringify(productsContainer))
//     // displayProducts();
// }



// document.querySelector('.btn').addEventListener('click',()=>{
//     updateProduct(i)
// })
// document.querySelector('.updbtn').addEventListener('click',()=>{
//     deleteProduct(i)
// })









    // if (validationProductName()){
    //     document.getElementById('btn-updated').classList.remove('disabled')
    // }
    // else{
    //     document.getElementById('btn-updated').classList.add('disabled')

    // }








