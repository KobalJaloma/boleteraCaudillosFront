import * as React from "react";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect } from "react";

const datosDefault = [{estatus: 'No contiene nada'}];
const initConfig = {
    sizeY: '40rem',
    btnColor: 'success'
}   

export const Excel = ({datos = datosDefault, config = initConfig}) => {
    var encabezados = [];
    const _export = React.useRef(null); 

    if(datos == '') {
        return (<p>Sin Informacion</p>)
    }

    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    //EXTRAER LAS KEYS DE LOS REGISTROS PARA ENCABEZADOS
    if(encabezados != []) {
        encabezados = Object.keys(datos[0]);
    }

    useEffect(() => {
        // SE ACTUALIZARA CADA VEZ QUE INGRESEN NUEVOS DATOS
    }, [datos]);
    
  return (
    <ExcelExport data={datos} ref={_export}>
      <Grid
        data={datos}
        className="table"
        style={{
          maxHeight: config.sizeY,
        }}
      >
        <GridToolbar>
          <button
            title="Exportar Excel"
            className={`btn btn-${config.btnColor}`}
            onClick={excelExport}
          >
           Excel
          </button>
        </GridToolbar>
        {/* AQUI ES DONDE ESTAN LOS HEADERS */}
        {
            encabezados.map(encabezado => (
                <GridColumn field={encabezado} title={encabezado} />
            ))
        }
      </Grid>
    </ExcelExport>
  );
};

{/* <GridColumn field="ProductID" title="Product ID" width="50px" />
<GridColumn field="ProductName" title="Product Name" width="350px" />
<GridColumn field="UnitPrice" title="Price" />
<GridColumn field="UnitsInStock" title="In stock" />
<GridColumn field="Discontinued" title="Discontinued" /> */}