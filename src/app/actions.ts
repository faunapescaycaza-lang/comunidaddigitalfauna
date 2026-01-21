"use server";



import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createId } from "@paralleldrive/cuid2";

// Esquema de validación con Zod

const ReportSchema = z.object({

  nombre: z.string().min(2, "El nombre es muy corto"),

  apellido: z.string().min(2, "El apellido es muy corto"),

  email: z.string().email("Email inválido"),

  fecha: z.coerce.date({ message: "Fecha inválida" }),

    localidad: z.string().min(2, "La localidad es muy corta"),

    imageUrl: z.string().url("URL de imagen inválida").or(z.literal("")).optional().nullable(),

  });



export type FormState = {

  message: string;

  errors?: Record<string, string[] | undefined>;

  success: boolean;

};







export async function createReport(

  prevState: FormState,

  formData: FormData

): Promise<FormState> {

        const validatedFields = ReportSchema.safeParse({

          nombre: formData.get("nombre"),

          apellido: formData.get("apellido"),

          email: formData.get("email"),

          fecha: formData.get("fecha"),

          localidad: formData.get("localidad"),

          imageUrl: formData.get("imageUrl"),

        });

    

      if (!validatedFields.success) {

        console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);

        return {

          message: "Error de validación. Por favor, revisa los campos.",

          errors: validatedFields.error.flatten().fieldErrors,

          success: false,

        };

      }

    

      try {

            const { nombre, apellido, email, fecha, localidad, imageUrl } = validatedFields.data;

        

            const newReportId = createId();

        

            await db.transaction().execute(async (trx) => {

              await trx

                .insertInto("Reporte")

                .values({

                                      id: newReportId,

                                      nombre,

                                      apellido,

                                      email,

                                      fecha,

                                      localidad,

                                      createdAt: new Date(),

                                    })

                                    .execute();

        

              console.log("Received imageUrl:", imageUrl);







                            if (imageUrl && imageUrl !== "") {

        

                              const result = await trx.insertInto("Imagen").values({

        

                                id: createId(),

        

                                url: imageUrl,

        

                                reporteId: newReportId,

        

                              }).execute();

        

                              console.log("Imagen insertion result:", result);

        

                            }

            });



    revalidatePath("/");



    



        if (validatedFields.data.email) {
      try {
        // Disparar la API de envío de correo sin esperar la respuesta
        fetch(new URL('/api/send-email', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: validatedFields.data.email,
            name: validatedFields.data.nombre,
          }),
        });
      } catch (emailError) {
        // Si el fetch falla (ej. error de red), solo lo registramos.
        // No bloqueamos la respuesta de éxito de la UI por esto.
        console.error("Triggering email API failed:", emailError);
      }
    }



    



        return {



          message: "¡Avistamiento registrado con éxito!",



          success: true,



        };

  } catch (error) {

      console.error("Upload/Database Error:", error);

      if (error instanceof Error && (error as any).code === '23505') {

        return {

          message: "Ya existe un reporte con este email.",

          success: false,

        };

      }

      return {

        message: "Error en la subida de archivos o en la base de datos.",

        success: false,

      };

    }

    }

    

    export async function deleteReport(reportId: string): Promise<FormState> {

      try {

        // Eliminar imágenes asociadas en Cloudinary si existen

        const imagenes = await db

          .selectFrom("Imagen")

          .where("reporteId", "=", reportId)

          .selectAll()

          .execute();

    

        for (const imagen of imagenes) {

          // Extraer public_id de la URL de Cloudinary

          const publicId = imagen.url.split('/').pop()?.split('.')[0];

          if (publicId) {

            await cloudinary.uploader.destroy(`fauna-comunidad/${publicId}`);

          }

        }

    

        await db.transaction().execute(async (trx) => {

          // Eliminar las imágenes de la base de datos

          await trx

            .deleteFrom("Imagen")

            .where("reporteId", "=", reportId)

            .execute();

    

          // Eliminar el reporte de la base de datos

          await trx

            .deleteFrom("Reporte")

            .where("id", "=", reportId)

            .execute();

        });

    

        revalidatePath("/"); // Revalidar la página principal para mostrar los cambios

    

        return {

          message: "Reporte eliminado con éxito.",

          success: true,

        };

      } catch (error) {

        console.error("Error al eliminar el reporte:", error);

        return {

          message: "Error al eliminar el reporte.",

          success: false,

        };

      }

    }
