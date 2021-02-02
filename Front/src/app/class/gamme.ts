export class Gamme {
 id?: number;
  libelle: string;
  dateCreation:Date;
  custom: boolean ;
  finition_ext_id :string;
  type_isolation_id  :string;
  type_couverture_id :string;
  qualite_huisseries_id  :string;
  conception_ossature_id  :string;

    constructor(_libelle: string,
    _dateCreation:Date,
    _custom: boolean ,
     _finition_ext_id :string    ,
     _type_isolation_id :string    ,
     _type_couverture_id  :string    ,
     _qualite_huisseries_id:string    ,
     _conception_ossature_id:string
     )
    {
        this.libelle = _libelle;
        this.dateCreation = _dateCreation;
        this.custom = _custom;
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
