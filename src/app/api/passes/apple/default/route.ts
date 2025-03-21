import { NextRequest, NextResponse } from 'next/server';
import { PKPass } from 'passkit-generator';
import path from 'path';
import fs from 'fs';
import { PASS_KEYPHRASE } from '@/config/secret';
import { generateSerial } from '@/utils/random';

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams;
    const name = search.get('name') || 'Default Pass';
    const email = search.get('email') || 'default@example.com';

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const certificatePath = path.join(process.cwd(), 'src','certs', 'certificate.pem');
    const keyPath = path.join(process.cwd(), 'src','certs', 'key.pem');
    const wwdrPath = path.join(process.cwd(), 'src','certs', 'wwdr.pem');
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'loyalty.pass');

    const cert = fs.readFileSync(certificatePath);
    const key = fs.readFileSync(keyPath);
    const wwdr = fs.readFileSync(wwdrPath);

    const serial = generateSerial();
    
    // @note This is the default pass from the template
    const pass = await PKPass.from({
      model: templatePath,
      certificates: {
        wwdr,
        signerCert: cert,
        signerKey: key,
        signerKeyPassphrase: PASS_KEYPHRASE,
      },
    }, {
      serialNumber: serial
    });

    // @note This is the primary field of a generic pass
    pass.primaryFields.push({
      key: 'balance',
      label: 'Balance',
      value: '100'
    });

    // @note This is the secondary field of a generic pass
    pass.secondaryFields.push({
      key: 'name',
      label: 'Name',
      value: name
    });

    pass.secondaryFields.push({
      key: 'email',
      label: 'Email',
      value: email
    });

    // @note This is the barcode of a generic pass
    pass.setBarcodes({
      message: serial,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1'
    });

    // @note This is the pass buffer for the response
    const buffer = pass.getAsBuffer();

    // @note This is the response with the pass file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-disposition': `attachment; filename=pass.pkpass`,
      },
    });

  } catch (error) {
    console.error('Error generating pass:', error);
    return NextResponse.json({ error: 'Failed to generate pass' }, { status: 500 });
  }
}