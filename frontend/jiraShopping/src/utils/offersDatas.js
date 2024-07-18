export const offersDatas = [
	{
		id : 1,
		seller : "Francky",
		buyer : "Thomas",
		product : "1",
		realPrice : 2000,
		offers : [
			{id:"1",from:"Thomas",price:"1200", hasGotResponse:0},{id:"2",from:"Francky",price:"1800",hasGotResponse:0},{id:"3",from:"Thomas",price:"1300",hasGotResponse:1,},
			{id:"4",from:"Francky",price:"1800",hasGotResponse:1},{id:"5",from:"Thomas",price:"1300",hasGotResponse:2,},{id:"6",from:"Thomas",price:"1300",hasGotResponse:2,},
		],
	}
]

export const notifications = [{
	NEW_COMMENT : "",
	NEW_ORDER : "",
}]

export const settings = [
	{
		name : "Parametres Du Compte",
		component : "AccountSettings"
	},
	{
		name : "Changer De Mot De Passe",
		component : "PasswordChange"
	},
	{
		name : "Mes Adresses",
		component : "Address",
	},
	{
		name : "A Propos De Nous",
		component : "AboutUs"
	},
]