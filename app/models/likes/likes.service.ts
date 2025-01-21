"use server";

import { createClient } from "@/utils/supabase/server";
import { action_result } from "@/interfaces/actions";
import { Like } from "@/models/likes/likes.types";

/**
 * Si cette méthode est appelé alors que le post n'était pas liké on insère le like dans la bd sinon on le supprime de la bd.
 *
 * @param userId - Identifiant de l'user liké/disliké.
 * @param postId - Identifiant du post liké/disliké.
 * @returns Une promesse qui qui se résoud par le résultat de l'opération, sinon une erreur.
 * @throws Lance une erreur si l'opération échoue.
 */
export const likePost = async (userId: string, postId: number): Promise<action_result> => {
  const supabase = await createClient();

  // On récupère le like s'il existe déjà
  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true }) // Fetch only the count without returning rows
    .eq('userId', userId)
    .eq('postId', postId);

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  // Si il y a déjà un like on le supprime
  if (count !== 0) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .eq('userId', userId)
      .eq('postId', postId)

    if (deleteError) throw deleteError;
    return { action: 'deleted'};
  } else {
    // S'il n'y a pas de like on l'ajoute
    const { error: insertError } = await supabase
      .from('likes')
      .insert([{ userId, postId }]);

    if (insertError) throw insertError;
    return { action: 'inserted'};
  }
};

/**
 * @param userId - Identifiant de l'user, dont on récupère les likes.
 * @returns Une promesse qui qui se résoud par un tableau de Likes, sinon une erreur.
**/
export const getLikesForPost = async (postId: number): Promise<Like[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('likes').select('*').eq('postId', postId);
  if (error) throw error;
  return data;
};
