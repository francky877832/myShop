export const offersDatas = [
	{
		id : 1,
		seller : "Francky",
		buyer : "Thomas",
		product : "1",
		realPrice : 2000,
		offers : [
			{_id:"1",from:"Thomas",price:"1200", hasGotResponse:0},{_id:"2",from:"Francky",price:"1800",hasGotResponse:0},{_id:"3",from:"Thomas",price:"1300",hasGotResponse:1,},
			{_id:"4",from:"Francky",price:"1800",hasGotResponse:1},{_id:"5",from:"Thomas",price:"1300",hasGotResponse:2,},{_id:"6",from:"Thomas",price:"1300",hasGotResponse:0,},
		],
	}
]
export const defaultOffer = {offers:[{_id:"1",hasGotResponse:0}]}

export const notifications = [{
	NEW_COMMENT : "",
	NEW_ORDER : "",
}]

export const settings = [
	{
		name : "Parametres Du Compte",
		component : "AccountSettings",
		available : true,
	},
	{
		name : "Changer De Mot De Passe",
		component : "PasswordChange",
		available : true,
	},
	{
		name : "Mes Adresses",
		component : "Address",
		available : true,
	},
	{
		name : "A Propos De Nous",
		component : "AboutUs",
		available : true,
	},
	{
		name : "Devenir Une Boutique Pro",
		component : "openShop",
		available : false,
	},
]