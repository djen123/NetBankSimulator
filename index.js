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
          amount = Number(amount);
        if(from === to){
            return false;

        } else if(from === "saving" && this.saving_balance >= amount){
            this.current_balance += amount;
            this.saving_balance -= amount;
            this.transactions.push(`Transferred ${amount} from saving to current on ${new Date().toString()}`);
            return true
        }else if(from === "current" && this.current_balance >= amount){
            this.current_balance -= amount;
            this.saving_balance += amount;
            this.transactions.push(`Transferred ${amount} from current to saving on ${new Date().toString()}`);
            return true;

        }else{
            return false;
        }


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
UI();



//deposit 
const depositBtn = document.getElementById("depositSubmit");
depositBtn.addEventListener("click",function(){
    const form = document.getElementById("depositForm");
    const amount = document.getElementById("depositAmount").value;
   

    const type = document.getElementById("type").value;
    const depositAccount = document.getElementById("to").value;
    const successText = document.getElementById("successText");
    
    if(amount == 0 || !depositAccount || !type){
        alert("enter amount ,deposit amount and type ");

    }
    userBankDetails.deposit(amount,depositAccount,type)
    UI();
    form.reset();
    successText.innerHTML = "Transaction successful";

})
// transfer section

const transferBtn = document.getElementById("transferButton");

transferBtn.addEventListener("click",()=>{
    const form = document.getElementById("transferForm");
    const amount = document.getElementById("transferAmount").value;
    const to = document.getElementById("to").value;
    const from = document.getElementById("from").value;
    
    if(!userBankDetails.transfer(to, from, amount)){
        alert("transfer failed")

    }else{
        UI();
    }
    form.reset();

})




