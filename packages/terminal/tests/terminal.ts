import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { execute, makeTestConfig } from '../lib/engine';

test('ls command', () => {
    const config = makeTestConfig();
    execute('ls -la', config);
});

test.run();
