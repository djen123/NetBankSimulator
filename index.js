//user bank details
const userBankDetails = {
    name:"Will Smith",
    saving_balance:5000,
    current_balance:10000,
    transactions :[],
    deposit(amount,type,to){
        amount = Number(amount);
       if(amount>0 && to === "saving"){
        this.saving_balance+=amount }
        if(amount>0 && to === "current"){
            this.current_balance += amount;
         }
        this.transactions.push(`you have deposited ${amount} to ${to} via ${type} on ${new Date().toString()}`)
        
        },
    transfer(to,from,amount){

    }}


function UI (){
    document.getElementById("savingBalance").innerText = `Balance ${userBankDetails.saving_balance}`;
    document.getElementById("currentBalance").innerText= `Balance ${userBankDetails.current_balance}`;
    const list = document.getElementById("list");
    list.innerHTML = "";
    

    userBankDetails.transactions.forEach((item)=>{
        
        const li = document.createElement("li");
        li.classList.add("list-group-item")
        li.innerText = item;
        list.appendChild(li);
        
    });
}
//DOm elements 
//set user current and saving balance
document.getElementById("savingBalance").innerText = userBankDetails.saving_balance;
document.getElementById("currentBalance").innerText=  userBankDetails.current_balance;


//deposit 
const depositBtn = document.getElementById("depositSubmit");
depositBtn.addEventListener("click",function(){
    const form = document.getElementById("depositForm");
    const amount = document.getElementById("depositAmount").value;
   

    const type = document.getElementById("type").value;
    const depositAccount = document.getElementById("to").value;
    const successText = document.getElementById("successText");
    
    if(amount>0 && depositAccount){
        userBankDetails.deposit(amount,type,depositAccount);
         successText.innerText = `Successfully deposited $${amount} to your ${depositAccount} account via ${type}.`;
        successText.style.color = "green";
    }else{
         successText.innerText = "Please enter amount and select account.";
        successText.style.color = "red";

    }
    UI();
  
    form.reset();

})


