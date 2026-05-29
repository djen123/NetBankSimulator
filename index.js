//user bank details
const userBankDetails = {
    name:"Dhan Limbu",
    saving_balance:5000,
    current_balance:10000,
    transactions :[],
    addTransaction(message){
        this.transactions.push(message);

    },
    deposit(amount,type,account){
        amount = Number(amount);
        if(!amount || amount <= 0) return false;
        if(account === "saving")this.saving_balance+=amount;
        if(account==="current")this.current_balance+=amount;
      
       this.addTransaction(`you have deposited £${amount} to ${account} via ${type} on ${new Date().toString()}`)
       return true;
        
        },
    transfer(from,to,amount){
          amount = Number(amount);
          if(!amount||amount<=0)return false;
          
            if(from === "saving" &&  to === "current") {
                if(this.saving_balance < amount) return false;
            this.current_balance -= amount;
            this.saving_balance += amount;
            this.addTransaction(`Transferred £ ${amount} from saving to current on ${new Date().toString()}`);
            return true;
        }
         if(from === "current" && to === "saving"){
            if(this.current_balance < amount) return false;

            this.current_balance -= amount;
            this.saving_balance += amount;
            this.addTransaction(`you have transferred £${amount} from current to saving on ${new Date().toString()}`);
            return true;

        }
            return false;
        },

    pay(amount,from,to,receiverAcc){
        amount = Number(amount);
    if(!amount || amount<=0){
        return false;
    }
 if (from === "current" && this.current_balance >= amount){
        this.current_balance-= amount;
        this.transactions.push(`you have sent $ ${amount} from current account to ${to} with bank account ${receiverAcc} on ${new Date().toString()}`)
        return true;
    }else{
        return false;
    }
}
}


function UI (){
    document.getElementById("clientName").innerText = `${userBankDetails.name}`
    document.getElementById("savingBalance").innerText = `Balance £ ${userBankDetails.saving_balance}`;
    document.getElementById("currentBalance").innerText= `Balance £ ${userBankDetails.current_balance}`;
    const list = document.getElementById("list");
    list.innerHTML = "";
    

    userBankDetails.transactions.forEach((item)=>{
        
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        if(item.toLowerCase().includes("deposited")){
            li.classList.add("border","text-primary")
        }
        else if(item.toLowerCase().includes("sent")){
            li.classList.add("border","text-info");
        }else if(item.toLowerCase().includes("transferred")){
            li.classList.add("border","text-success")
        }
        li.innerText = item;
        list.appendChild(li);
        
    });
}
function successText(){
      const successText = document.getElementsByClassName("successText");
      successText.innerHTML = "";

       for (let text of successText){
         text.innerHTML = "";
       }

    for (let text of successText) {
        text.innerHTML = "Transaction successful";
        text.style.color = "green";
        text.style.textAlign = "center";
        text.classList.add("mt-5");
        //clears the field after 3 secs
           setTimeout(() => {
            text.innerHTML = "";
        }, 3000);
    
    }
        


}
//DOm elements 
//set user current and saving balance





UI();



//deposit 
const depositBtn = document.getElementById("depositSubmit");
 
depositBtn.addEventListener("click",function(){

    const form = document.getElementById("depositForm");
    const amount = document.getElementById("depositAmount").value;
    const type = document.getElementById("type").value;
    const account = document.getElementById("account").value;
  
    
    if(!amount  || !account || !type){
        alert("Enter amount,method and select one account");
        form.reset();
        return;

    }
    if(!userBankDetails.deposit(amount,type,account)){

    
        alert("Deposit failed");
        form.reset();
    return;
}
    UI();
    successText();
    form.reset();


})
// transfer section

const transferBtn = document.getElementById("transferButton");

transferBtn.addEventListener("click",()=>{
    const form = document.getElementById("transferForm");
    const amount = document.getElementById("transferAmount").value;
    const to = document.getElementById("to").value;
    const from = document.getElementById("from").value;
    if(!amount || amount == 0 || !to || !from){
        alert("Enter amount and select both accounts ");
          form.reset();
        return;
      

    }
    if(from === to){
        alert("you cannot transfer to the same account");
        form.reset();
        return;
    
    }
    if(!userBankDetails.transfer( from,to,amount)){
        alert("Transaction failed");
        form.reset();
        return;
        }
        
    UI();
    successText();
    form.reset();

})

//pay or send
const payButton = document.getElementById("payButton");
payButton.addEventListener("click",()=>{
    const form = document.getElementById("paysendForm");
    const amount = document.getElementById("payAmount").value;
    const from = document.getElementById("payFrom").value;
  const to = document.getElementById("receiver").value
  const receieverAcc = document.getElementById("receiverAcc").value;
    //aler if any value is empty
     if(!amount || !from || !to || !receieverAcc){
        alert("Enter all fields before sending money ");
        form.reset();
        return;

    }
    //if flase alert user to try again
    if(!userBankDetails.pay(amount,from,to,receieverAcc)){
        alert("Payment failed! please try again");
        form.reset();
        return;
    }
        //if all sorted then update amount  and history
        UI();
        successText();
        form.reset();

});


