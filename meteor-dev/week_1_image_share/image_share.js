Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {

    //Template.images.helpers({images:img_data});
    // in filter: field value -1 means highest value first
    Template.images.helpers({images:
            Images.find({}, { sort: {createdOn: -1, rating: -1 } })
    });


    Template.images.events({
        'click .js-image': function (event) {
            $(event.target).css("width", "50px");
        },
        'click .js-del-image': function (event) {
            var image_id = this._id;
            console.log(image_id);
            $("#" + image_id).hide('slow', function () {
                Images.remove({ "_id": image_id });
            });
        },
        'click .js-rate-image': function (event) {
            // console.log('you clicked a star');
            var rating = $(event.currentTarget).data("userrating");
            console.log(rating)
            var image_id = this.id;
            console.log(image_id);
            Images.update({ _id: image_id },
                          { $set: { rating: rating } }
                );
        }
    });

    Template.image_add_form.events({
        'submit .js-add-img': function (event) {
            var img_src, img_alt;
            img_src = event.target.img_src.value;
            img_alt = event.target.img_alt.value;
            console.log("src: " + img_src, " alt: " + img_alt);
            //  We just put return false like this at the end of our event code in Meteor 
            // and it will just stop it from doing whatever the browser normally does when they submit a form.

            Images.insert({
                img_src: img_src,
                img_alt: img_alt,
                createdOn: new Date()
            })
            return false;
        }

    });
}



