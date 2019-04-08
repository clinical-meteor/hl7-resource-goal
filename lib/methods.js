

Meteor.methods({
    'Goal/create':function(goalObject){
        console.log('Creating Goal...');
        check(goalObject, Object);

        if(this.userId){
            if(!Goals.findOne({description: goalObject.description})){
                Goals.insert(goalObject, {validation: false, filter: false}, function(error, result){
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        console.log('Goal created: ' + result);
                    }
                });    
            }    
        } else {
            console.log('User not logged in.  Aborting..')
        }
    },
    'Goal/Initialize/NoSmoking':function(){
        console.log('Goal/Initialize/NoSmoking');

        if(this.userId){
            var developAwareness = {
                description: 'Biomarker - Weight - Loose 20 lbs.',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: developAwareness.description})){
                Goals.insert(developAwareness);    
            }


            var cycleToWork = {
                description: 'Biomarker - Blood Pressure - 120/80-140/90',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: cycleToWork.description})){
                Goals.insert(cycleToWork);    
            }

            var quitSmoking24 = {
                description: '24 hours without cigarette smoking.',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: quitSmoking24.description})){
                Goals.insert(quitSmoking24);    
            }
            
            var quitSmoking3days = {
                description: '3 days without cigarette smoking.',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: quitSmoking3days.description})){
                Goals.insert(quitSmoking3days);    
            }

            var quitSmoking7days = {
                description: '7 days without cigarette smoking.',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: quitSmoking7days.description})){
                Goals.insert(quitSmoking7days);    
            }
            
            var quitSmoking1month = {
                description: '1 month without cigarette smoking.',
                priority: {
                    text: 'medium'
                },
                status: 'planned'
            };
            if(!Goals.findOne({description: quitSmoking1month.description})){
                Goals.insert(quitSmoking1month);    
            }
        } else {
            console.log('User not logged in.  Aborting.')
        }
    },
    'Goal/drop': function(){
        console.log('-----------------------------------------');
        console.log('Dropping goals... ');
        if(this.user){
            Goals.find().forEach(function(goal){
                Goals.remove({_id: goal._id});
            });    
        } else {
            console.log('User not logged in.  Aborting.')
        }
    }
});
    
