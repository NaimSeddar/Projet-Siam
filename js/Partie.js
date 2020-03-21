class Partie {

    constructor(plateau, joueur1, joueur2) {
        this.plateau = plateau;
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
    }

    save() {
        var values = {};
        values["id"] = $("#game_id").val();
        values["data"] = partie;
        values["joueurCourant"] = joueurCourant.id;
        console.log(values);
        $.ajax({
            method: "POST",
            url: "ajax/users.ajax.php?act=savePartie",
            data: values,
            type: "POST",
            dataTyp1e: 'json',
            async: false
        }).done(function(response) {
            console.log("Result :");
            console.log(response);
          
            initPlayerImagesListener(joueur1);
            initPlayerImagesListener(joueur2);
        });

    }

    actualiserTour(joueur) {
        console.log("--- Actualisation tour ---");
        console.log(joueur.getUserID() == parseInt(session["id"]));
        if(joueur.getUserID() != parseInt(session["id"])) {
            // removeAllListeners();
        } else {
            console.log("C'est mon tour");
        }
        console.log("--- ^^^^^^^^^^^^^^^^^^ ---");
    }

    changementDeTour() {
        if(joueurCourant.getUserID() == this.joueur1.getUserID) {
            joueurCourant = this.joueur2;
            removeJoueurListeners(1);
        } else {
            joueurCourant = this.joueur1;
            removeJoueurListeners(2);
        }
        initPlayerImagesListener(joueurCourant);
    }

}