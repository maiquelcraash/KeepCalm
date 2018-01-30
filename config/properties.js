/**
 * Created by maiquel on 24/03/17.
 */

(function () {
	"use strict";

	/* Server Settings */
	exports.SERVER_PORT = 8082;

	/* Twitter Authentication */
	exports.TWITTER_KEY = 'BxiQLE4OPPmmRvgw5aC9yKqST';
	exports.TWITTER_SECRET = 'LJSKJESeB7NV9SxBbe7QmYVl9bqMpQIIiZKnHDSltQYsUDlliI';
	exports.TWITTER_TOKEN = '1539136728-7L8QdVnN0y2BKJ4nJjRtuxwONRBsIHiSXyjHFgM';
	exports.TWITTER_TOKEN_SECRET = 'mOauAa9SJEOjmF2JQWiYVqn8ijwMHbsFsEK3kRYRVEJNs';

	exports.HANGRY_WORDS = [
		'fdp',
		'caralho',
		'merda',
		'bosta',
		'porra',
		'puta'
	];

	exports.MONGODB_CONFIG = {
		"mongoUrl": "mongodb://localhost:27017/KeepCalm",
	};

	exports.STOPWORDS = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não', 'n', 'nao', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'ao', 'ele', 'das', 'à', 'seu', 'sua', 'ou', 'quando', 'muito', 'nos', 'já', 'ja', 'jah', 'eu', 'também', 'só', 'so', 'soh', 'pelo', 'pela', 'até', 'ate', 'isso', 'ela', 'entre', 'depois', 'sem', 'mesmo', 'msm', 'aos', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'você', 'voce', 'vc', 'essa', 'num', 'nem', 'suas', 'meu', 'às', 'minha', 'numa', 'pelos', 'elas', 'qual', 'nós', 'nos', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'dele', 'tu', 'te', 'vocês', 'voces', 'vcs', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos', 'nossas', 'dela', 'delas', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo', 'estou', 'está', 'estamos', 'estão', 'estive', 'esteve', 'estivemos', 'estiveram', 'estava', 'estávamos', 'estavam', 'estivera', 'estivéramos', 'esteja', 'estejamos', 'estejam', 'estivesse', 'estivéssemos', 'estivessem', 'estiver', 'estivermos', 'estiverem', 'hei', 'há', 'havemos', 'hão', 'houve', 'houvemos', 'houveram', 'houvera', 'houvéramos', 'haja', 'hajamos', 'hajam', 'houvesse', 'houvéssemos', 'houvessem', 'houver', 'houvermos', 'houverem', 'houverei', 'houverá', 'houveremos', 'houverão', 'houveria', 'houveríamos', 'houveriam', 'sou', 'somos', 'são', 'era', 'éramos', 'eram', 'fui', 'foi', 'fomos', 'foram', 'fora', 'fôramos', 'seja', 'sejamos', 'sejam', 'fosse', 'fôssemos', 'fossem', 'for', 'formos', 'forem', 'serei', 'será', 'seremos', 'serão', 'seria', 'seríamos', 'seriam', 'tenho', 'tem', 'temos', 'tém', 'tinha', 'tínhamos', 'tinham', 'tive', 'teve', 'tivemos', 'tiveram', 'tivera', 'tivéramos', 'tenha', 'tenhamos', 'tenham', 'tivesse', 'tivéssemos', 'tivessem', 'tiver', 'tivermos', 'tiverem', 'terei', 'terá', 'teremos', 'terão', 'teria', 'teríamos', 'teriam'];
	exports.TRASH_SYMBOLS = ['@', 'kk', 'hehe', 'shua', 'ahua', 'http', 'haha', '#', 'R$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
}());