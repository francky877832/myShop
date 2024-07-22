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
export const defaultOffer = {offers:[{_id:"100",hasGotResponse:0}]}


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




export const notifications = 
	{
		USER : {
			ON_REGISTERED : { 
				message : "",
				action : "",
			},
		},

	ORDERS : {
		ON_NEW_ORDER : { 
			message : "",
			action : "",
		},
		ON_ORDER_PENDING : { 
			message : "",
			action : "",
		},
		ON_ORDER_SHIPPED : { 
			message : "",
			action : "",
		},
		ON_ORDER_DELIVERED : { 
			message : "",
			action : "",
		},
	},

	OFFERS : {
		ON_NEW_OFFER : { 
			message : "",
			action : "",
		},
		ON_OFFER_RESPONSE : {
			ON_ACCEPTED : { 
				message : "",
				action : "",
			},
			ON_REFUSED : { 
				message : "",
				action : "",
			},
		}
	},

	PRODUCTS : {
		ON_NEW_LIKE : { 
			message : "",
			action : "",
		},
		ON_NEW_COMMENT : { 
			message : "",
			action : "",
		},
		ON_RESPONSE_COMMENT : { 
			message : "",
			action : "",
		},
		ON_NEW_BASKET : { 
			message : "",
			action : "",
		},
	},

	ADMIN : {
		MISSED_YOU : { 
			message : "",
			action : "",
		},
		NEW_PRODUCT : { 
			message : "",
			action : "",
		},
		DONT_WASTE_TIME : { 
			message : "",
			action : "",
		},
		BE_CAREFULL : {
			BAD_COMMENT : { 
				message : "",
				action : "",
			},
			BAD_PRODUCT : { 
				message : "",
				action : "",
			},
		},
	}

}
