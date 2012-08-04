if (Meteor.is_client) {
  Session.set("guessing", false)
  Session.set("message", "I'm going to guess your number between 1 and 30")
  Session.set("button", "Start")

  Template.start.message = function() {
	return Session.get("message")
  }
  Template.start.button = function() {
    return Session.get("button")	
  }
  Template.start.guessing = function() {
	return Session.get("guessing")
  }
  Template.guess.number = function() {
	return Math.round( (Session.get("highest") - Session.get("lowest") ) / 2 ) + Session.get("lowest")
  } 

  Template.start.events = {
    'click #start' : function () {
	  Session.set("lowest", 0)
	  Session.set("highest", 31)
	  Session.set("guessing", true)
	  Session.set("tries", 1)
    }
  };

  Template.guess.events = {
    'click #higher': function() {
	  Session.set("tries", Session.get("tries") + 1)
	  Session.set("lowest", Template.guess.number())
    },
    'click #lower': function() {
	  Session.set("tries", Session.get("tries") + 1)
	  Session.set("highest", Template.guess.number())
    },
    'click #gotit': function() {
	  Session.set("message", "I'm correct! I got it in " + Session.get("tries") + " tries.")
	  Session.set("guessing", false)
	  Session.set("button", "Play again?")	
    }
  }
}