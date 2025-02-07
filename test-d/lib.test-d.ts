import { expectType, expectDeprecated, expectNotDeprecated, expectDocCommentIncludes } from 'tsd'
import pinoOpenSearch, { DestinationStream, Options } from '../';

const options = {} as Options;

expectType<DestinationStream>(pinoOpenSearch())
expectType<DestinationStream>(pinoOpenSearch(options));

expectNotDeprecated(options.flushBytes)

expectNotDeprecated(options.flushInterval)

expectNotDeprecated(options.opType)

expectNotDeprecated(options.esVersion)

expectNotDeprecated(options.ssl?.rejectUnauthorized)
