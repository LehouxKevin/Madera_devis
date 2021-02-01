export class Gamme {
 id?: number;
  libelle: string;
  finition_ext_id :number;
  type_isolation_id  :number;
  type_couverture_id  :number;
  qualite_huisseries_id  :number;
  conception_ossature_id  :number;

    constructor(_libelle: string,
     _finition_ext_id :number    ,
     _type_isolation_id :number    ,
     _type_couverture_id  :number    ,
     _qualite_huisseries_id:number    ,
     _conception_ossature_id:number    ,
     )
    {
        this.libelle = _libelle;
        this.finition_ext_id = _finition_ext_id;
        this.type_isolation_id = _type_isolation_id;
        this.type_couverture_id = _type_couverture_id;
        this.qualite_huisseries_id = _qualite_huisseries_id;
        this.conception_ossature_id =        _conception_ossature_id;

        console.log(this.libelle+
        this.finition_ext_id+
        this.type_isolation_id+
        this.type_couverture_id+
        this.conception_ossature_id+
        this.qualite_huisseries_id);
    }
}
