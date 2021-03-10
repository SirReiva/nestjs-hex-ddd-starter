import { AutonomousCommunities } from '../enums/autonomous-communities.enum';
import { Provinces } from '../enums/provinces.enum';
import { Address } from '../types/address.type';
import { FullAddress } from '../types/full-address.type';

/** Province-Autonomous communnity mapper */
const addressMapper: { [key in Provinces]: AutonomousCommunities } = {
	[Provinces.ALMERIA]: AutonomousCommunities.ANDALUCIA,
	[Provinces.CADIZ]: AutonomousCommunities.ANDALUCIA,
	[Provinces.CORDOBA]: AutonomousCommunities.ANDALUCIA,
	[Provinces.GRANADA]: AutonomousCommunities.ANDALUCIA,
	[Provinces.HUELVA]: AutonomousCommunities.ANDALUCIA,
	[Provinces.JAEN]: AutonomousCommunities.ANDALUCIA,
	[Provinces.MALAGA]: AutonomousCommunities.ANDALUCIA,
	[Provinces.SEVILLA]: AutonomousCommunities.ANDALUCIA,

	[Provinces.HUESCA]: AutonomousCommunities.ARAGON,
	[Provinces.TERUEL]: AutonomousCommunities.ARAGON,
	[Provinces.ZARAGOZA]: AutonomousCommunities.ARAGON,

	[Provinces.ASTURIAS]: AutonomousCommunities.ASTURIAS,

	[Provinces.BALEARES]: AutonomousCommunities.BALEARES,

	[Provinces.TENERIFE]: AutonomousCommunities.CANARIAS,
	[Provinces.LAS_PALMAS]: AutonomousCommunities.CANARIAS,

	[Provinces.CANTABRIA]: AutonomousCommunities.CANTABRIA,

	[Provinces.ALBACETE]: AutonomousCommunities.CASTILLA_LA_MANCHA,
	[Provinces.CIUDAD_REAL]: AutonomousCommunities.CASTILLA_LA_MANCHA,
	[Provinces.CUENCA]: AutonomousCommunities.CASTILLA_LA_MANCHA,
	[Provinces.GUADALAJARA]: AutonomousCommunities.CASTILLA_LA_MANCHA,
	[Provinces.TOLEDO]: AutonomousCommunities.CASTILLA_LA_MANCHA,

	[Provinces.AVILA]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.BURGOS]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.LEON]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.PALENCIA]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.SALAMANCA]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.SEGOVIA]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.SORIA]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.VALLADOLID]: AutonomousCommunities.CASTILLA_LEON,
	[Provinces.ZAMORA]: AutonomousCommunities.CASTILLA_LEON,

	[Provinces.BARCELONA]: AutonomousCommunities.CATALUNA,
	[Provinces.GIRONA]: AutonomousCommunities.CATALUNA,
	[Provinces.LERIDA]: AutonomousCommunities.CATALUNA,
	[Provinces.TARRAGONA]: AutonomousCommunities.CATALUNA,

	[Provinces.ALICANTE]: AutonomousCommunities.COMUNIDAD_VALENCIANA,
	[Provinces.CASTELLON]: AutonomousCommunities.COMUNIDAD_VALENCIANA,
	[Provinces.VALENCIA]: AutonomousCommunities.COMUNIDAD_VALENCIANA,

	[Provinces.BADAJOZ]: AutonomousCommunities.EXTREMADURA,
	[Provinces.CACERES]: AutonomousCommunities.EXTREMADURA,

	[Provinces.A_CORUNA]: AutonomousCommunities.GALICIA,
	[Provinces.LUGO]: AutonomousCommunities.GALICIA,
	[Provinces.OURENSE]: AutonomousCommunities.GALICIA,
	[Provinces.PONTEVEDRA]: AutonomousCommunities.GALICIA,

	[Provinces.LA_RIOJA]: AutonomousCommunities.LA_RIOJA,

	[Provinces.MADRID]: AutonomousCommunities.MADRID,

	[Provinces.MURCIA]: AutonomousCommunities.MURCIA,

	[Provinces.NAVARRA]: AutonomousCommunities.NAVARRA,

	[Provinces.ALAVA]: AutonomousCommunities.PAIS_VASCO,
	[Provinces.GIPUZKOA]: AutonomousCommunities.PAIS_VASCO,
	[Provinces.VIZCAYA]: AutonomousCommunities.PAIS_VASCO,

	[Provinces.CEUTA]: AutonomousCommunities.CEUTA,

	[Provinces.MELILLA]: AutonomousCommunities.MELILLA,
};

/**
 * Adds an autonomous community (a.c.) to address based on province
 * @param address Address without a.c.
 * @returns Address with a.c.
 */
export const mapAddress = (address: Address): FullAddress => ({
	...address,
	community: addressMapper[address.province],
});
