
export module AppConstants {

  export const LocalStorage = {Menu: 'chl-menu', Usuario: 'chl-usuario', NebularToken: 'chl_app_token'};
export const CriterioPaginar = {Dir: 'ASC', Tamanio: 7};
export const DetalleCasosColumna = {Sede: 'Sede', Caso: 'Caso',
         Solicitante: 'Solicitante',
         TipoCaso: 'TipoCaso', Estado: 'Estado'};

export const Dashboard = { ConsultaTecnica: "CONTEC", AnalisisFalla: "ANAFA", AtencionTecnica: "ATETEC", GoodWill: "GOODW" }
export const Roles = {GestorTaller: "00000001", SupervisorTaller:"00000002", TecnicoTaller:"00000003", ConsultorTecnico:"00000004", GestorAFA: "00000005", EspecialistaAFA: "00000006", ConsultorTaller:"00000007", EspecialistaProducto: "00000008", EspecialistaGranMineria: "00000009" };
export const ExtensionArchivo = {Word2003:"doc",Word2007:"docx",Excel2003:"xls",Excel2007:"xlsx",PortalDocumentFormat:"pdf",TaggedImageFileFormat:"tiff"}
export const TitulosToastr={Warning:"Advertencia",Error:"Error",Info:"Atención",Success:"Éxito"};
export const MensajeGenericoToast={Error:'<span class="span" tabindex="0"><u>Más detalles:</u></span><p class="alert">mensaje</p>'};
export const ErrorMessages = { ErrorServidor: "Error inesperado en el servidor" }
export const MensajeCambiosPendientes="¿Tiene cambios sin guardar, esta seguro de salir del formulario?";
export const RootCustomer:string="/home/customer";
export const MensajeInformativo={ SinPermiso:'No tiene permiso para este módulo'};
}
